# Linux Sysconfig

The Linux Sysconfig allows you to adjust kernel parameters, also known as sysconfig parameters, while the system is running without the need for a reboot or kernel rebuild. These parameters can be found using the `sysctl` command, in the `/proc/sys/` virtual mounted folder, and configuration files in the `/etc/sysctl.d/` directory.

## Configuring kernel parameters at runtime

You can configure kernel parameters at runtime using the `sysctl` command. Here are the steps:

### Get a list of all parameters and their values

```sh
sysctl -a
```

### Configure a parameter temporarily

```sh
sysctl <TUNABLE_CLASS>.<PARAMETER>=<TARGET_VALUE>
```

### Configure a parameter permanently

```sh
sysctl -w <TUNABLE_CLASS>.<PARAMETER>=<TARGET_VALUE> >> /etc/sysctl.conf
```

## Configure parameters with files in `/etc/sysctl.d/`

You can also configure parameters by creating configuration files in the `/etc/sysctl.d/` directory. Here are the steps:

1. Create a configuration file:

```sh
vim /etc/sysctl.d/<some_file.conf>
```

2. Add the desired parameters and their values to the file in the following format:

```text
<TUNABLE_CLASS>.<PARAMETER>=<TARGET_VALUE>
<TUNABLE_CLASS>.<PARAMETER>=<TARGET_VALUE>
```

3. Apply the changes using the `sysctl` command:

```sh
sysctl -p /etc/sysctl.d/<some_file.conf>
```

### Sysconfig parameter reference

For more information about specific sysconfig parameters, you can refer to the following resources:

- [Sysctl Explorer](https://sysctl-explorer.net/)
- [Official documentation](https://www.kernel.org/doc/Documentation/sysctl/)
- [IP sysconfig](https://www.kernel.org/doc/Documentation/networking/ip-sysctl.txt)

### Useful links

- [Configuring kernel parameters at runtime | RedHat](https://access.redhat.com/documentation/en-us/red_hat_enterprise_linux/8/html/managing_monitoring_and_updating_the_kernel/configuring-kernel-parameters-at-runtime_managing-monitoring-and-updating-the-kernel)
- [The sysconfig Directory | RedHat](https://access.redhat.com/documentation/en-us/red_hat_enterprise_linux/5/html/deployment_guide/ch-sysconfig)
- [OpenSUSE sysconfig repo | Github](https://github.com/openSUSE/sysconfig/)
