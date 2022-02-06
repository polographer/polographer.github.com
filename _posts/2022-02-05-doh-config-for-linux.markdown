---
layout: post
title:  "DoH configuration for Raspberry Pi OS (repost)"
date:   2022-02-05 14:26:51 -0500
categories: update meta
tags: linux raspberry security privacy
author: Polo Ornelas
---

There is a lot of tutorials for setting up DoH for pi-hole, however what about a simple(r) thing? just configure DoH to use on your local Linux, that's a topic commonly ignored. This is useful if you are using Linux as a daily driver, you are trying to evade some kind of DNS blocking, or bypass crappy DNS servers from your ISP.
The configuration involves installing cloudflared, configuring it as DNS proxy, and then configuring resolv to use your DNS proxy.

## cloudflared

Let's start with cloudflared, on this case the best way is to configure it to run as "root" because we will want to use a privileged port (53). You may need to change the download for your architecture; I’m using armv7 aka 32 bit raspberry.

### install

{% highlight shell %}
wget https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-arm 
sudo cp ./cloudflared-linux-arm /usr/local/bin/cloudflared 
sudo chmod +x /usr/local/bin/cloudflared 
cloudflared -v
{% endhighlight %}
For 64 bit raspberry use this instead the first line;

{% highlight shell %}
wget https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-arm64
{% endhighlight %}


### configure
Then create the config file;
{% highlight shell %}
sudo mkdir /etc/cloudflared/ 
sudo nano /etc/cloudflared/config.yml
{% endhighlight %}

Add this configuration
{% highlight shell %}
proxy-dns: true
proxy-dns-port: 53
proxy-dns-upstream:
  - https://1.1.1.1/dns-query
  - https://1.0.0.1/dns-query
  # comment the next ones if you don’t need ipv6 support
  - https://[2606:4700:4700::1111]/dns-query
  - https://[2606:4700:4700::1001]/dns-query
{% endhighlight %}

Then install the service
{% highlight shell %}
sudo cloudflared service install --legacy
sudo systemctl start cloudflared 
sudo systemctl status cloudflared
{% endhighlight %}

## resolv
The second part is to configure resolv to use our local DNS

{% highlight shell %}
sudo nano /etc/resolvconf.conf
{% endhighlight %}

Uncomment line #7 the one that says name_servers
{% highlight shell %}
# Configuration for resolvconf(8)
# See resolvconf.conf(5) for details

resolv_conf=/etc/resolv.conf
# If you run a local name server, you should uncomment the below line and
# configure your subscribers configuration files below.
name_servers=127.0.0.1

# Mirror the Debian package defaults for the below resolvers
# so that resolvconf integrates seemlessly.
dnsmasq_resolv=/var/run/dnsmasq/resolv.conf
pdnsd_conf=/etc/pdnsd.conf
unbound_conf=/etc/unbound/unbound.conf.d/resolvconf_resolvers.conf
{% endhighlight %}

this is the line you should uncomment (remove the #);
{% highlight shell %}
name_servers=127.0.0.1
{% endhighlight %}

Then restart your raspberry, for some reason if you only restart the network it may not work.
And that should be all, name resolution will now go via clodflared. If you are running on the command line there is really no way to test this because http://1.1.1.1/help uses javascript and neither links nor lynx are capable of running it. The only real test is to shutdown cloudflared.

---
#### Links

[Installing cloudflared on linux](https://docs.pi-hole.net/guides/dns/cloudflared/#installing-cloudflared)
