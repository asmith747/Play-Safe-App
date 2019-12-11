docker build -t park-node .

docker network create park-net
docker run -d --name db --net park-net -p 3306:3306 -e MYSQL_DATABASE='db' -e MYSQL_USER='user' -eMYSQL_PASSWORD='password' -eMYSQL_ROOT_PASSWORD='password' -v /var/lib/mysql mysql:5.7
docker run --name parkNode --net park-net  -p 3000:3000 park-node
