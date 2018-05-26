
# Web assembly and embedded programming
Linear algebra can of course be dramatically useful for browser applications
or embedded applications. For example, vector, matrix, and geometric operations
are must-haves for any game running on the browser. Also, you may need matrix decompositions
to perform machine-learning related data analysis on an embedded program. Luckily **nalgebra**
supports both [compiling for wasm](#for-browser-applications) and deactivating its
link to the Rust standard library so that it becomes
[compilable for targets without libstd](#for-embedded-development).

## For browser applications
All features of the **nalgebra** crate, including pure-rust implementations of matrix
decompositions, will work out-of-the-box when compiled for the `wasm32-unknown-unknown`
target. Recall that compiling to `wasm` only amounts to setting-up the target and passing
the right parameters to `cargo`:

```bash
$ rustup target add wasm32-unknown-unknown # Must be done only once on your machine.
$ cargo build --target wasm32-unknown-unknown
```

On the other hand the **nalgebra-lapack** crate will not compile for wasm at all since
it relies on binding to implementations of Blas and Lapack.

## For embedded development
When developing applications targeting embedded platforms, the rust standard library
`libstd` is not always available. In those situations you typically have to add the `#![no-std]`
attribute to your project to prevent it from linking to `libstd`. Though this
will be useless if **nalgebra** itself links to the standard library! This section
explains how to compile **nalgebra** without needing `libstd`, and how this affects
the features you can use.

Note that the **nalgebra-lapack** crate on the other hand does not support being compiled
without the Rust standard library yet.

### Compiling without standard library
**nalgebra** supports the `std` feature which is enabled by default. Disabling this
feature will prevent **nalgebra** itself from linking to `libstd`. To achieve this
you have to compile with a nightly version of the Rust compiler and declare your **nalgebra**
dependency with `default-features = false`, i.e., like the following:

```toml
[dependencies]
nalgebra = { version = "0.15", default-features = false }
```

This will affect what feature can be used. In particular:

* All vector and matrix operations on statically-sized matrices and statically-sized vectors will
  continue work out-of-the box. Of course, this includes all the **matrix decompositions**!
* Geometric operations that depend on trigonometric functions (like the creation of a quaternion from
  an angle and axis) are available but will trigger link errors for the trigonometric function being used.
  The next [section](#trigonometry-and-power-functions) shows how to fix this.
* Creating random matrices or vectors without an user-provided distribution will not be available. Therefore
  the `::new_random()` constructor will not exist. You may still use `::from_distribution(...)` instead.
* Dynamically sized vectors `DVector` and dynamically sized matrices `DMatrix` will not be available unless you activate
  the `alloc` feature as well and provide an allocator for your platform. This will let **nalgebra**
  link to the [alloc](https://doc.rust-lang.org/alloc/) crate and use the `Vec` data structure internally. You may
  do the following to enable this feature:

```toml
[dependencies]
nalgebra = { version = "0.15", default-features = false, features = [ "alloc" ] }
```

### Trigonometry and power functions
All trigonometric, power, and rounding functions for floating point numbers
depend on compiler intrinsics that are not available when a library is compiled
without `libstd`. Therefore, whenever your **nalgebra** dependency is compiled without
`libstd`, link errors will be generated whenever a feature relying on one
of those function is used. For example, compiling the following rust code:

```rust
#![no_std]
extern crate nalgebra as na;
use na::UnitComplex;

fn foo() -> UnitComplex<f64> {
    UnitComplex::new(2.0)
}
```

with the following dependency:

```toml
[dependencies]
nalgebra = { version = "0.15", default-features = false }
```

will cause the compiler to output a link error ending like this:

```yaml
  = note: Undefined symbols for architecture x86_64:
            "_alga_sin_f64", referenced from:
                _$LT$f64$u20$as$u20$alga..general..real..Real$GT$::sin_cos::h66a220f1c62a00d2 in project_name-c4e18277ea3b910c.147srt92n3an30z.rcgu.o
            "_alga_cos_f64", referenced from:
                _$LT$f64$u20$as$u20$alga..general..real..Real$GT$::sin_cos::h66a220f1c62a00d2 in project_name-c4e18277ea3b910c.147srt92n3an30z.rcgu.o
          ld: symbol(s) not found for architecture x86_64
          clang: error: linker command failed with exit code 1 (use -v to see invocation)
```

It means that to use this feature (here initializing a unit complex number from an angle)
**nalgebra** needs to know how to compute `sin` and `cos`. You can provide those information
by defining the `alga_sin_f64` and `alga_cos_f64` function (if 32-bit floats were used, you
would need `alga_sin_f32` and `alga_cos_f32`). Those function must follow the standard "Rust"
calling convention, be declared public, and have the `#[no_mangle]` attribute to avoid name
mangling. Not that the link errors show functions names with leading underscore `_` that
must not appear at the start of the name of your own function definitions. Taking all those
restrictions into account would look like the following:

```rust
#![no_std]
extern crate nalgebra as na;
use na::UnitComplex;

#[no_mangle]
pub fn alga_sin_f64(x: f64) -> f64 {
  // Your implementation of sin.
}

#[no_mangle]
pub fn alga_cos_f64(x: f64) -> f64 {
  // Your implementation of cos.
}

fn foo() -> UnitComplex<f64> {
    UnitComplex::new(2.0)
}
```

The actual implementation of trigonometric and power functions will depend on your specific target.
If something like `libm` is available on the targeted platform then you can simply add the corresponding
bindings as a dependency to you project and call them as part of your implementation of `alga_sin_f64`
and `alga_cos_f64`.
Otherwise, you might want to take a look at the `math.rs` [project](https://github.com/nagisa/math.rs) which
features pure-rust implementation of some of the common trigonometric functions. Though keep in mind that,
as far as we know, `math.rs` is not published to crates.io and might not be maintained anymore.