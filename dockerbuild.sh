grunt build
cd dist/images/
for file in *1.png ; do mv $file ${file:9} ; done
cd ../..
docker build -t anabranch/sfcrime-viewer .
docker push anabranch/sfcrime-viewer
