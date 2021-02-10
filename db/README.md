# Food Stock DB
Food Stock database

## How to run the database

First build the image :
```
sudo docker build -t food-stock .
```

Then start the container :
```
sudo docker run -d --name food-stock --env POSTGRES_PASSWORD=[password] -p 5432:5432 food-stock
```

Note: for data persistance you need to create a folder postgres-data

If already have an active port
```
sudo lsof -i :port
sudo kill {pid}
```

If already have an active id
```
docker rm {container_id}
```