#!/bin/bash

mkdocs build
rsync -av --delete-after site/ crozet@ssh.cluster003.ovh.net:/home/crozet/nalgebra/
