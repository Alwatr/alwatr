type LightContext = { brightness: number };
type LightState = 'on' | 'off';
type LightEvent = { type: 'TOGGLE' } | { type: 'SET_BRIGHTNESS'; level: number };

// 2. Define config
const lightMachineConfig: StateMachineConfig<LightContext, LightEvent, LightState> = {
  name: 'light-switch',
  initial: 'off',
  context: { brightness: 0 },
  states: {
    off: {
      on: { TOGGLE: { target: 'on' } }
    },
    on: {
      entry: [(context) => ({ brightness: context.brightness || 100 })],
      on: {
        TOGGLE: { target: 'off', actions: [() => ({ brightness: 0 })] },
        SET_BRIGHTNESS: { actions: [(context, event) => ({ brightness: event.level })] }
      }
    }
  }
};

// 3. Create the service
const lightService = createFsmService(lightMachineConfig);

// 4. Use it in your application
lightService.state$.subscribe(state => {
  console.log(`Light is ${state.value} with brightness ${state.context.brightness}`);
});

lightService.send({ type: 'TOGGLE' }); // Light is on with brightness 100
lightService.send({ type: 'SET_BRIGHTNESS', level: 50 }); // Light is on with brightness 50

// 5. Cleanup
// lightService.destroy();