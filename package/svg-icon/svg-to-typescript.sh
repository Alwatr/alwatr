#!/bin/bash

clear

read -p 'Please Enter Icons Directory ?? >>>  ' icons_directory
read -p 'Please Enter TypeScript Icon File *Name* ?? >>>  ' ts_file

echo ''
echo "import { svg } from 'lit';" >$ts_file.ts

ls $icons_directory | while read file; do
  echo -e "\e[1;33mMinimization\e[0m $file"
  sed -i ':a;N;$!ba;s/\n//g' ./$icons_directory/$file

  echo -e "\e[1;34mStandardization\e[0m $file"
  sed -i 's/#000/currentcolor/g; s/[ ]xmlns="http:\/\/www\.w3\.org\/2000\/svg"//g' ./$icons_directory/$file
  sed -i 's/width="512"//g;' ./$icons_directory/$file
  sed -i 's/height="512"//g;' ./$icons_directory/$file
  sed -i 's/\t/ /g;' ./$icons_directory/$file
  sed -i 's/<svg/<svg width="24" height="24"/g' ./$icons_directory/$file

  echo "export const $(echo "${file%.*}" | sed -E 's/[ _-]([a-z])/\U\1/gi;s/^([A-Z])/\l\1/') = svg\`$(cat ./$icons_directory/$file)\`;" >>$ts_file.ts
  echo -e "\e[1;32mConversion\e[0m $file"

  echo ''
  sleep .025
  clear
done

echo ''
