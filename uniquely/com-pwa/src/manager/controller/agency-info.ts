import {FsmTypeHelper, finiteStateMachineProvider} from '@alwatr/fsm';
import {message} from '@alwatr/i18n';
import {commandTrigger} from '@alwatr/signal';
import {AgencyInfo, agencyInfoSchema} from '@alwatr/type/src/customer-order-management.js';
import {snackbarSignalTrigger} from '@alwatr/ui-kit/src/snackbar/show-snackbar.js';
import {validator} from '@alwatr/validator';

export const submitAgencyInfoCommandTrigger = commandTrigger.bind<Partial<AgencyInfo>, AgencyInfo | null>(
    'submit-agency-info-command',
);

export const agencyInfoFsmConstructor = finiteStateMachineProvider.defineConstructor('agency_info_fsm', {
  initial: 'agencyInfoForm',
  context: {
    agencyInfo: {},
    registeredAgencyInfo: <AgencyInfo | null> null,
  },
  stateRecord: {
    $all: {
      on: {},
    },
    agencyInfoForm: {
      on: {
        submit: {
          target: 'submitting',
          condition: 'validate_agency_form_info',
        },
      },
    },
    submitting: {
      entry: 'submit_agency_info',
      on: {
        submit_success: {
          target: 'submitSuccess',
        },
        submit_failed: {
          target: 'submitFailed',
        },
      },
    },
    submitSuccess: {
      entry: 'reset_agency_info_form',
      on: {},
    },
    submitFailed: {
      on: {
        retry: {
          target: 'submitting',
        },
      },
    },
  },
});

export type AgencyInfoFsm = FsmTypeHelper<typeof agencyInfoFsmConstructor>;

// entries actions
finiteStateMachineProvider.defineActions<AgencyInfoFsm>('agency_info_fsm', {
  reset_agency_info_form: (fsmInstance) => {
    fsmInstance.setContext({agencyInfo: {}});
  },

  submit_agency_info: async (fsmInstance) => {
    const response = await submitAgencyInfoCommandTrigger.requestWithResponse(fsmInstance.getContext().agencyInfo);
    if (response == null) {
      fsmInstance.transition('submit_failed');
    }
    else {
      fsmInstance.transition('submit_success', {agencyInfo: response});
    }
  },
});

// condition
finiteStateMachineProvider.defineActions<AgencyInfoFsm>('agency_info_fsm', {
  validate_agency_form_info: (fsmInstance) => {
    try {
      const agencyInfo = fsmInstance.getContext().agencyInfo;
      const response = validator<AgencyInfo>(agencyInfoSchema, agencyInfo, true);
      fsmInstance.setContext({registeredAgencyInfo: response});
      return true;
    }
    catch (err) {
      snackbarSignalTrigger.request({
        message: message('page_agency_info_info_not_valid_message'),
      });
      return false;
    }
  },
});
