# Docker Image Artifact Upload - DEPRECATED

**DEPRECATED. This action will no longer be maintained and cease to get new features in future.**

**Please migrate your workflows to use [_ishworkh/container-image-artifact-upload@v1.0.0_](https://github.com/ishworkh/container-image-artifact-upload) instead. It includes same features for docker and it adds support for podman on top of docker.**

Github action for uploading docker image artifacts. It leverages github action's artifact in the background to share docker image across jobs. The artifact created by each run of this action will be visible in the list of artifacts for the workflow and is prefixed with `action_image_artifact_`. For eg. docker image `foo:latest` will be uploaded as `action_image_artifact_foo_latest`.

See [docker-image-artifact-download](https://github.com/ishworkh/docker-image-artifact-download).

## Migration to `container-image-artifact-upload`

- Update `docker-image-image-upload` action in workflows to following,

```yaml
- name: Upload an image
  uses: ishworkh/container-image-artifact-upload@v1.0.0
  with:
    image: "test_image:latest"
    retention_days: "2"
```

Variable `container_engine` added in `container-image-artifact-upload` action defaults to `docker`.

# Please update you workflows to use proper semver versions introduced since v2.0.0.

## Inputs

### `image`

**Required** Image name that is to be uploaded.

### `retention_days`

**Optional** Number of retention days passed to underlying [`@actions/artifact uploadArtifact method`](https://github.com/actions/toolkit/tree/main/packages/artifact#available-options) 

## Outputs

### `artifact_name`

Name of artifact created in the process. Eg. `action_image_artifact_foo_latest` for `foo:latest` image.

## Example

```yaml
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
      uses: ishworkh/docker-image-artifact-upload@v2.0.1
      with:
        image: "test_image:latest"

```

With `rentention_days`,

```yaml
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
      uses: ishworkh/docker-image-artifact-upload@v2.0.1
      with:
        image: "test_image:latest"
        retention_days: "2"

```

In conjuction with `docker/build-push-action@v2` buildx builds,

```yaml
jobs:
  build_and_upload:
    - name: Checkout project
      uses: actions/checkout@v2
      
    - name: Set up Docker Buildx
      id: buildx
      uses: docker/setup-buildx-action@v1
  
    - name: Build and push
      id: docker_build
      uses: docker/build-push-action@v2
      with:
        push: false
        builder: ${{ steps.buildx.outputs.name }}
        tags: "test_image:latest"
        load: true

    - name: Upload image
      uses: ishworkh/docker-image-artifact-upload@v2.0.1
      with:
        image: "test_image:latest"

```

## Changelogs

### `v2.1.0`

- Update README about deprecation.

### `v2.0.1`

- Fix README.

### `v2.0.0`

- Bump `docker-image-artifact` to `v2.0.0`.
- Introduce semver versioning for github action releases. No versions with just major segment i.e `v1` will be released from now on.

### `v1`

- Old release

## License

This library is under the MIT license.
