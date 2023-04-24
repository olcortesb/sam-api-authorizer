# sam-api-authorizer
Demo for test new functionality of sam , local test of authorizers 

This is a demo for test the new AWS sam functionality. 

## The files in the project:

- `template.yml`: 
Have the defintions of infrastructure, Api, Lambda authorizer, and lambda logger.

- `autorizer.js`
Have the code of validations of autorizer, is base on template of AWS lambda autorizer

- `handler.js`
Is the code of lambda logger.

## Demo
Requirements:
- This new feature is avaliable from: aws sam `1.80.0+`
- Update to new version:
    - For another Os versions: https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/manage-sam-cli-versions.html

```bash 
sam --version
# SAM CLI, version 1.76.0

# For mac
brew upgrade aws-sam-cli

sam --version
# SAM CLI, version 1.81.0
```

For test local the authorizations api:

```bash
sam local start-api -p 3002 --log-file logfile.txt 
```
- The `local` and `start api` command is for star the api.
- `-p 3002` for start the server in this port
- `--log-file` logfile.txt for log in this file similar to cloudWatch.

Call the endpoint:
Bad token for demo
````bash
curl -X GET \
  'http://127.0.0.1:3002/logger' \
  --header 'Accept: */*' \
  --header 'Authorization: Bearer e81a50b9ddd'
# Response:
#{
#  "message": "User is not authorized to access this resource"
#}
````
Good token 
````bash
curl -X GET \
  'http://127.0.0.1:3002/logger' \
  --header 'Accept: */*' \
  --header 'Authorization: Bearer e81a50b9'

# Response
# "OK"
````
The log File:
````shell
START RequestId: c0bd0c4a-0722-4b82-8c68-d56c0b26d128 Version: $LATEST
2023-04-24T13:05:22.621Z	c0bd0c4a-0722-4b82-8c68-d56c0b26d128	INFO	Method ARN: arn:aws:execute-api:us-east-1:123456789012:1234567890/dev/GET/logger
2023-04-24T13:05:22.627Z	c0bd0c4a-0722-4b82-8c68-d56c0b26d128	INFO	Token fron event: Bearer e81a50b9
2023-04-24T13:05:22.628Z	c0bd0c4a-0722-4b82-8c68-d56c0b26d128	INFO	Log from lambda authorizer ...
2023-04-24T13:05:22.628Z	c0bd0c4a-0722-4b82-8c68-d56c0b26d128	INFO	El token:  Bearer e81a50b9
END RequestId: c0bd0c4a-0722-4b82-8c68-d56c0b26d128
REPORT RequestId: c0bd0c4a-0722-4b82-8c68-d56c0b26d128	Init Duration: 1.69 ms	Duration: 1523.58 ms	Billed Duration: 1524 ms	Memory Size: 128 MB	Max Memory Used: 128 MB	
START RequestId: 771e169a-e624-419b-84b2-47332568bcc9 Version: $LATEST
2023-04-24T13:05:25.023Z	771e169a-e624-419b-84b2-47332568bcc9	INFO	You are authorizer
END RequestId: 771e169a-e624-419b-84b2-47332568bcc9
REPORT RequestId: 771e169a-e624-419b-84b2-47332568bcc9	Init Duration: 1.32 ms	Duration: 1484.84 ms	Billed Duration: 1485 ms	Memory Size: 128 MB	Max Memory Used: 128 MB	


````

# References
- AWS Sam Anouncenment: https://aws.amazon.com/es/about-aws/whats-new/2023/04/aws-sam-cli-local-testing-api-gateway-lambda-authorizers/
- AWS Sam Authorizer docs: https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/using-sam-cli-local-start-api.html#using-sam-cli-local-start-api-authorizers
- https://aws.amazon.com/es/serverless/sam/ 


