

Disable triggerhappy, these are for creating buttons with hot actions
```
sudo systemctl disable triggerhappy
```

## increase swap

First, shutdown the swap
```
sudo dphys-swapfile swapoff
```
Edit the config file
```
sudo nano /etc/dphys-swapfile
```
Change it to 2gb
```
CONF_SWAPSIZE=2048
```
run swap setup to idelete the old and create a new one
```
sudo dphys-swapfile setup
```
Turn it on again
```
sudo dphys-swapfile swapon
```

---

sudo systemctl enable code-server@$USER
sudo setcap cap_net_bind_service=+ep /usr/lib/code-server/lib/node


bbind-addr: "[::]:443"
auth: password
cert-host: "penpen.local"
password: thisistheapppassword
cert: true

sudo systemctl start code-server@$USER

cd .local/share/code-server
copy penpen_local.crt to ipad 


trust self-signed 


Settings -> General -> About -> Certificate Trust Settings, and there is a section called "ENABLE FULL TRUST FOR ROOT CERTIFICATES"


code icons
/usr/lib/code-server/src/browser/media




---

# Links
https://diode.io/raspberry%20pi/running-forever-with-the-raspberry-pi-hardware-watchdog-20202/
https://marcelwiget.blog/2018/12/02/tether-rpi-to-ipad-pro-via-ethernet-over-usb-c/
https://discussions.apple.com/thread/7738477
https://learnembeddedsystems.co.uk/overclocking-the-raspberry-pi-zero-2



