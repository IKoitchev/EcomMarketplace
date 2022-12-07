docker build . -t ikoitchev/product-service-k8s
docker push ikoitchev/product-service-k8s
kubectl create -f .\k8s\deployment.yaml
kubectl get pods