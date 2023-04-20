import {FsmTypeHelper, finiteStateMachineProvider} from '@alwatr/fsm';
import {commandTrigger} from '@alwatr/signal';
import {AgencyInfo, agencyInfoLoginSchema} from '@alwatr/type/customer-order-management.js';
import {snackbarSignalTrigger} from '@alwatr/ui-kit/src/snackbar/show-snackbar.js';
import {validator} from '@alwatr/validator';

export const loginFsmConstructor = finiteStateMachineProvider.defineConstructor('login_fsm', {
  initial: 'form',
  context: {
    agencyInfo: <Partial<AgencyInfo>>{},
  },
  stateRecord: {
    $all: {
      on: {},
    },
    form: {
      on: {
        login: {
          target: 'login',
          condition: 'validate_agency_info',
        },
      },
    },
    login: {
      entry: 'submit_agency_info',
      on: {
        login_success: {
          target: 'loginSuccess',
        },
        login_failed: {
          target: 'loginFailed',
        },
        user_not_exists: {
          actions: 'notify_user_not_exists',
        },
      },
    },
    loginSuccess: {
      entry: ['notify_login_success', 'reset'],
      on: {
        form: {
          target: 'form',
        },
      },
    },
    loginFailed: {
      on: {
        retry: {
          target: 'login',
        },
      },
    },
  },
});

export type LoginFsm = FsmTypeHelper<typeof loginFsmConstructor>;

// entries actions
finiteStateMachineProvider.defineActions<LoginFsm>('login_fsm', {
  submit_agency_info: async (fsmInstance): Promise<void> => {
    const agencyInfo = fsmInstance.getContext().agencyInfo;
    const response = await commandTrigger.requestWithResponse<Partial<AgencyInfo>, AgencyInfo | 'not_exists' | null>(
        'login-command',
        agencyInfo,
    );
    if (response === 'not_exists') {
      fsmInstance.transition('user_not_exists');
    }
    else if (response === null) {
      fsmInstance.transition('login_failed');
    }
    else {
      fsmInstance.transition('login_success');
    }
  },

  notify_user_not_exists: () => {
    snackbarSignalTrigger.request({actionLabelKey: 'page_login_user_not_exists'});
  },
  notify_login_success: () => {
    snackbarSignalTrigger.request({actionLabelKey: 'page_login_success'});
  },
  reset: (fsmInstance) => {
    fsmInstance.setContext({agencyInfo: {}});
    fsmInstance.transition('form');
  },
});

// condition
finiteStateMachineProvider.defineActions<LoginFsm>('login_fsm', {
  validate_agency_info: (fsmInstance): boolean => {
    try {
      const agencyInfo = validator(agencyInfoLoginSchema, fsmInstance.getContext().agencyInfo);
      fsmInstance.setContext({agencyInfo});
      return true;
    }
    catch (err) {
      snackbarSignalTrigger.request({actionLabelKey: 'agency_info_not_valid'});
      return false;
    }
  },
});

