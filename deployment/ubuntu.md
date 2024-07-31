### Amazon EC2 (Ubuntu)

Here's an example session. This could definitely be improved and
automated.

#### Switch to root

```
sudo su
```

#### Dependencies (as root)


```
apt-get update
apt-get upgrade -y
apt-get install git awscli nginx

# Add Docker's official GPG key:
apt-get install ca-certificates curl gnupg
install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
chmod a+r /etc/apt/keyrings/docker.gpg

# Add the repository to Apt sources:
echo \
  "deb [arch="$(dpkg --print-architecture)" signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
  "$(. /etc/os-release && echo "$VERSION_CODENAME")" stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
apt-get update

apt-get install docker-ce

# Use a production-quality storage driver that doesn't leak disk space
cat >>/etc/docker/daemon.json <<EOF
{
    "storage-driver": "overlay2"
}
EOF

# Ensure Docker can control the PID limit
mount | grep cgroup/pids

# Ensure Docker can control swap limit
# https://docs.docker.com/engine/installation/linux/linux-postinstall/#your-kernel-does-not-support-cgroup-swap-limit-capabilities

service docker restart
usermod -a -G docker ubuntu

fallocate -l 1G /swap.fs
chmod 0600 /swap.fs
mkswap /swap.fs
```

#### Set aside disk space (as root)
```
fallocate -l 512M /playground.fs
device=$(losetup -f --show /playground.fs)
mkfs -t ext3 -m 1 -v $device
mkdir /mnt/playground
```

#### Configure disk mountpoints (as root)
```
cat >>/etc/fstab <<EOF
/swap.fs        none            swap   sw       0   0
/playground.fs /mnt/playground  ext3   loop     0   0
EOF
```

Reboot the instance at this point.

#### Get the code
```
git clone https://github.com/bowbahdoe/run-java-code.git
cd run-java-code
```

#### Make update.sh

Copy the update.sh from this repo then run

```
chmod +x update.sh
```

#### Set a crontab to update the assets, binary, and docker containers

```
crontab -e
```

Review the [example crontab](crontab) in this repo. It calls [`update.sh`](update.sh) also in this repo.

#### Start snapd

```
sudo service snapd start
sudo snap install --classic certbot
sudo ln -s /snap/bin/certbot /usr/bin/certbot
sudo certbot --nginx
```

#### Install the SystemD service

[playground.service](playground.service)

```
sudo cp playground.service /etc/systemd/system/playground.service
sudo service playground stop
sudo service playground start
sudo systemctl enable playground.service
```

#### Install the Nginx reverse proxy

[playground-reverse-proxy](playground-reverse-proxy)

```
sudo rm /etc/nginx/sites-enabled/default
sudo cp java-playground.com.conf /etc/nginx/sites-enabled
sudo service nginx reload
```

#### Configure SSL

https://letsencrypt.org/getting-started/
