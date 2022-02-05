#!/bin/bash

clear

read -p 'Please Enter Icons Directory ?? >>>  ' icons_directory
read -p 'Please Enter TypeScript Icon File *Name* ?? >>>  ' ts_file

echo ''
echo "import { svg } from 'lit';" > $ts_file.ts

ls $icons_directory | while read file; do
  echo "export const $(echo "${file%.*}" | sed -E 's/[ _-]([a-z])/\U\1/gi;s/^([A-Z])/\l\1/') = svg\`$(cat ./$icons_directory/$file)\`;" >>$ts_file.ts
  echo "$(echo "${file%.*}" | sed -E 's/[ _-]([a-z])/\U\1/gi;s/^([A-Z])/\l\1/') create"
done

echo ''
