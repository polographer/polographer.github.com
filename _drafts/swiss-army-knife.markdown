---
layout: post
title:  "DRAFT / Raspberry Pi; the swiss army knife of our generation"
date:   2022-02-05 13:26:51 -0500
categories: development raspberry
author: Polo Ornelas    
---
Web development on iPad Pro and a Raspberry Pi Zero 2 W

I have tested all major platforms for development (mostly web development); all of them have drawbacks. Hardware, software, UI, compatibility, cost, etc. Unless you are a fanboy that cannot see above your head you will realize that choosing a developer environment is “choose your pain”.

My last adventure is probably something that by design is not optimal, but it made sense to me, let me explain to you why; I'm a web developer with photography as a hobby, after using a photo editor with a pen directly on the screen you realize that the mouse is just "old", the more natural way to edit photos is with a digital pen. But at the same time, I'm a web developer, and I need some kind of *nix environment to be able to develop sanely.

Windows, ChromeOS, and iOS support digital pen, in my opinion, iOS and Windows support it "better" than ChromeOS. On the other side Windows, ChromeOS and Mac, and Linux have some kind of *nix environment.

|           | Mac | Win | Linux | iOS | ChromeOS |
|-----------|-----|-----|-------|-----|----------|
| Touch     | no  | yes | no    | yes | yes      |
| Linux env | yes | yes | yes   | no  | yes      |

Technically speaking only windows and chrome provides what I need. For chrome, I have a complete post where I talk about google's lack of commitment in hardware. I would not consider touching another Chromebook until Google takes Chrome OS seriously (probably never as fuchsia is ramping up).

For my second option (windows), there is one big issue;

## Money
Running a pen on windows is expensive; you need a high-end machine and an integrated digitizer, I've tried the surface book 2 and it was decent, however, I needed to change it because it failed (unrelated). My options were a Surface Book 3 or the Asus ROG Flow X13 (with the eGPU). To run any photography suite you are talking about having at least an entry-level discrete graphics, you are no longer talking about the entry-level laptop, for the Microsoft option you are talking about 2K USD at least and 3k USD for the Asus. These are beautiful machines but seriously expensive, I can get a Leica glass for that money.

## What if ...
At that time my sister lends me her iPad mini to do some quick adjustments on a couple of photos.
Oh boy! it was quick to do photo editing, way faster than windows. So I begin thinking, what If I switch to an iPad.

This was at the beginning of the year 2021, the iPad Pro with an M1 was just launched and I started to think if it was possible to do my photo editing on the iPad and do my coding on a remote machine, I'm interested in some machine learning so I started researching about this, and I found the Nvidia Jetson Nano, it was a sign, I was going to develop remotely from the iPad on the Jetson, having access to the best of the tools for what I need. And with a CUDA environment. 

I'm sold, it's time to do some shopping.

## Which iPad 
This is an easy one; any with USB-C, from there choose whatever you can afford.

While the iPad Pro supports thunderbolt, the air and the mini provide interesting advantages, just think what are your external devices needs. For me is mostly a SD car reader.

The external monitor support for ipad is in reality junk, ignore that.

# sd card

# applications

# ssh shell

# Configuration

First things are basics, get the Raspberry Pi OS Lite. You can get graphical interface later if needed, but the idea is to squeeze as much as possible power as possible. Graphical interfaces are heavy even if they are on linux.

First disable everything not needed;

## Initial Config

$ cd /Volumes/boot $ echo 'dtoverlay=dwc2' >> config.txt 
$ sed -i '' 's/quiet/quiet modules-load=dwc2,g_ether/' cmdline.txt
$ touch ssh


## Disable Bluetooth

Edit the boot config file
```
sudo vi /boot/config.txt
```

add this at the bottom (you can probably add a section for #hacks)

```
dtoverlay=disable-bt
```

then disable the bluetooth services
```
sudo systemctl disable hciuart.service
sudo systemctl disable bluetooth.service
```

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


trust self signed
Settings -> General -> About -> Certificate Trust Settings, and there is a section called "ENABLE FULL TRUST FOR ROOT CERTIFICATES"


code icons
/usr/lib/code-server/src/browser/media

#remote access
Fix the "Authentication Required to Create Managed Color Device"
http://c-nergy.be/blog/?p=12043

My only regret; I should have bought the cellular-capable iPad, maybe in a couple of years ...


Bonus points: watchdog
https://diode.io/raspberry%20pi/running-forever-with-the-raspberry-pi-hardware-watchdog-20202/

Firx rpi 4 
https://github.com/neutrinolabs/xrdp/issues/2060

Links;
https://marcelwiget.blog/2018/12/02/tether-rpi-to-ipad-pro-via-ethernet-over-usb-c/
https://discussions.apple.com/thread/7738477
https://learnembeddedsystems.co.uk/overclocking-the-raspberry-pi-zero-2

