
# Web assembly and embedded programming
It is common practice to remove from the public API any feature that would
not work without `libstd`. **nalgebra** makes an exception for features
relying on float exponentials and trigonometric fonction: instead of removing,
e.g., quaternions, rotations, from the public API when you compile it for embedded
targets, you will be able to use them but the compiler will complain with link errors.
This gives you a chance to provide platform-specific implementation of some fundamental
trigonomitric function and continue to benefit from the more complex structure
provided by **nalgebra**. Refer to this [section](#trigonometry_and_power_functions)
for further details.

## For browser applications
All features of the **nalgebra** crate, including matrix decompositions, will
work out-of-the-box when compiled for the `wasm32-unknown-unknown` target. Recall
that compiling in `wasm` only ammounts to passing the right parameter to `cargo`:

```bash
$ rustup target add wasm32-unknown-unknown # Must be done only once.
$ cargo build --target wasm32-unknown-unknown
```

On the other hand the **nalgebra-lapack** crate will not compile for wasm since
it relies on binding to implementations of Blas and Lapack.

## For embedded development
### Compiling without standard library
### Trigonometry and power functions
All trigonometric, power, and rounding functions for floating point numbers
depend on compiler intrinsics that are not available when a library is compiled
without `libstd`. Therefore, your **nalgebra** dependency is compiled without
`libstd`, you will get link errors whenever you use a feature relying on one
of those function. For example, if you compile a binary with the following
dependency:

```toml
[dependencies]
nalgebra = { version = "0.15", default-features = false }
```

and the following Rust code:

```rust
use nalgebra::UnitComplex;

fn foo() -> UnitComplex<f64> {
    UnitComplex::new(2.0)
}
```

The compiler will output a link error ending like this:

```yaml
  = note: Undefined symbols for architecture x86_64:
            "_alga_sin_f64", referenced from:
                _$LT$f64$u20$as$u20$alga..general..real..Real$GT$::sin_cos::h66a220f1c62a00d2 in project_name-c4e18277ea3b910c.147srt92n3an30z.rcgu.o
            "_alga_cos_f64", referenced from:
                _$LT$f64$u20$as$u20$alga..general..real..Real$GT$::sin_cos::h66a220f1c62a00d2 in project_name-c4e18277ea3b910c.147srt92n3an30z.rcgu.o
          ld: symbol(s) not found for architecture x86_64
          clang: error: linker command failed with exit code 1 (use -v to see invocation)
```

It means that to use this feature (here, initializing a unit complex number from an angle),
**nalgebra** needs to know how to compute `sin` and `cos`. You can provide those information
by defining the `alga_sin_f64` and `alga_cos_f64` function (if 32-bit floats were used, you
would need `alga_sin_f32` and `alga_cos_f32`). Those function must follow the standard "Rust"
calling convension, be declared public, and have the `#[no_mangle]` attribute to avoid name
mangling. Not that the link errors shows functions names with leading underscore `_` that
must not appear in your function definitions. It would look like the following:

```rust
#[no_mangle]
pub fn alga_sin_f64(x: f64) -> f64 {
  // Your implementation of sin.
}

#[no_mangle]
pub fn alga_cos_f64(x: f64) -> f64 {
  // Your implementation of cos.
}
```

The actual implementation of those trigonometric functions will depend on your specific target.
You something like `libm` is available for your target, you can simply add the corresponding
binding as a dependency to you project and call them as part of your implementation of `sin` and `cos`.
Otherwise, you might want to take a look at the `math.rs` [project](https://github.com/nagisa/math.rs) wich
has pure-rust implementation of some of the common trigonometric functions. Though as far as we know, `math.rs`
is not published to crates.io, and may be maintained any more.