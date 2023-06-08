# Linux Sysconfig

## What are kernel parameters [`sysconfig`]?

Tunable values which you can adjust while the system is running. without rebooting or rebuilding the kernel required to apply changes.

These params can be found from the `sysctl` command, `/proc/sys/` virtual mounted folder, and configuration file in the `/etc/sysctl.d/` directory.

### Configuring kernel parameters at runtime with the `sysctl` command

Use the sysctl command to temporarily set kernel parameters at runtime. The command is also useful for listing and filtering tunables.

Get a list of all parameters and their values.

```sh
sysctl -a
```

Configure a parameter temporarily.

```sh
sysctl <TUNABLE_CLASS>.<PARAMETER>=<TARGET_VALUE>
```

Configure a parameter permanently.

```sh
sysctl -w <TUNABLE_CLASS>.<PARAMETER>=<TARGET_VALUE> >> /etc/sysctl.conf
```

Load changed

```sh
sysctl -p
```

---

### Useful link

- [Configuring kernel parameters at runtime | RedHat](https://access.redhat.com/documentation/en-us/red_hat_enterprise_linux/8/html/managing_monitoring_and_updating_the_kernel/configuring-kernel-parameters-at-runtime_managing-monitoring-and-updating-the-kernel)
- [The sysconfig Directory | RedHat](https://access.redhat.com/documentation/en-us/red_hat_enterprise_linux/5/html/deployment_guide/ch-sysconfig)
- [OpenSUSE sysconfig repo | Github](https://github.com/openSUSE/sysconfig/)
- <https://www.kernel.org/doc/html/latest/admin-guide/sysctl/>
- <https://www.kernel.org/doc/Documentation/sysctl/>
- <https://www.kernel.org/doc/Documentation/networking/ip-sysctl.txt>
