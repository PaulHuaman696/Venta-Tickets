provider "aws" {
  region  = "us-east-2"
  profile = "default"
}

terraform {
   required_version = ">= 0.12"
   required_providers {
       mongodbatlas = {
           source = "mongodb/mongodbatlas"
           version = "1.14.0"
       }
   }
}

provider "mongodbatlas" {
   public_key  = var.atlas_public_key
   private_key = var.atlas_private_key
}
