# `load-balancer`

Manually created in the Google Cloud Console.
1. Create HTTPS load balancer (use a static IP)
1. Use a backend bucket and point to your GCS bucket configured in Ghost's storage adapter
1. Create new SSL certificate
1. Set DNS A record for domain (e.g. assets.example.com) and point to public IP