#!/bin/bash

mkdocs build
cp docs/.htaccess site/.
rsync -av --delete-after site/ crozet@ssh.cluster003.ovh.net:/home/crozet/nalgebra/
