
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

!!! Warning
    Compiling without the standard library is necessary **only for embedded development**.
    You do not need to disable libstd when compiling to wasm!

**nalgebra** supports the `std` feature which is enabled by default. Disabling this
feature will prevent **nalgebra** itself from linking to `libstd`. To achieve this
you have to compile with a nightly version of the Rust compiler and declare your **nalgebra**
dependency with `default-features = false`, i.e., like the following:

```toml
[dependencies]
nalgebra = { version = "0.18", default-features = false }
```

This will affect what feature can be used. In particular:

* All vector and matrix operations on statically-sized matrices and statically-sized vectors will
  continue work out-of-the box. Of course, this includes all the **matrix decompositions**!
* Geometric operations will continue to work out-of-the box.
* Creating random matrices or vectors without an user-provided distribution will not be available. Therefore
  the `::new_random()` constructor will not exist. You may still use `::from_distribution(...)` instead.
* Dynamically sized vectors `DVector` and dynamically sized matrices `DMatrix` will not be available unless you activate
  the `alloc` feature as well and provide an allocator for your platform. This will let **nalgebra**
  link to the [alloc](https://doc.rust-lang.org/alloc/) crate and use the `Vec` data structure internally. You may
  do the following to enable this feature:

```toml
[dependencies]
nalgebra = { version = "0.18", default-features = false, features = [ "alloc" ] }
```
