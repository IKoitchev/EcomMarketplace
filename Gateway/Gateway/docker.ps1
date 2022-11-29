docker build '../../Product microservice' -t product-service
docker build '../../Image microservice' -t image-service
docker build '../../Shopping cart microservice' -t shopping-cart
docker build . -t express-gateway
docker compose up