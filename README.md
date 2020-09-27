# Docker Image Artifact Upload

Github action for uploading a docker image artifact. It leverages github action's artifact in the background to share docker image across jobs. The artifact created by each run of this action will be visible in the list of artifacts for the workflow and is prefixed with `action_image_artifact_`. For eg. docker image `foo:latest` will be uploaded as `action_image_artifact_foo_latest`.

See [docker-image-artifact-download](https://github.com/ishworkh/docker-image-artifact-download).


## Inputs

### `image`

**Required** Image name that is to be uploaded.

## Outputs

### `artifact_name`

Name of artifact created in the process. Eg. `action_image_artifact_foo_latest` for `foo:latest` image.

## Example usage

### With an extractor regex 
```
...
jobs:
  build_and_upload:
    - name: Checkout project
      uses: actions/checkout@v2
      
    - name: Build image
      run: |
        docker build -t test_image:latest -<<EOF
        FROM busybox
        RUN touch abc.txt
        EOF

    - name: Upload image
      uses: ishworkh/docker-image-artifact-upload@v1
      with:
        image: "test_image:latest"

```

## License
This library is under the MIT license.


