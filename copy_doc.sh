#! /bin/sh

out_dir=./docs/rustdoc
nalgebra_dir=../nalgebra

echo "Generating the documentation..."
cd $nalgebra_dir; rm -r target/doc; cargo doc -p nalgebra --no-deps --all-features
cd -
rm -rf docs/rustdoc
cp -r $nalgebra_dir/target/doc $out_dir

echo "... documentation for nalgebra generated!"

./fix_rustdoc.sh rustdoc rustdoc_nalgebra


echo "Generating the documentation..."
out_dir=./docs/rustdoc_glm

cd $nalgebra_dir; rm -r target/doc; cargo doc -p nalgebra-glm --no-deps --all-features
cd -
rm -rf docs/rustdoc_glm
cp -r $nalgebra_dir/target/doc $out_dir

echo "... documentation for nalgebra-glm generated!"

./fix_rustdoc.sh rustdoc_glm rustdoc_nalgebra_glm

