import {FsmTypeHelper, finiteStateMachineProvider} from '@alwatr/fsm';
import {commandTrigger} from '@alwatr/signal';
import {AgencyInfo} from '@alwatr/type/src/customer-order-management.js';
import {snackbarSignalTrigger} from '@alwatr/ui-kit/src/snackbar/show-snackbar.js';

export const submitAgencyInfoCommandTrigger = commandTrigger.bind<Partial<AgencyInfo>, AgencyInfo | null>(
    'submit-agency-info-command',
);

export const agencyInfoFsmConstructor = finiteStateMachineProvider.defineConstructor('agency_info_fsm', {
  initial: 'agencyInfoForm',
  context: {
    agencyInfo: {},
  },
  stateRecord: {
    $all: {
      on: {},
    },
    agencyInfoForm: {
      on: {
        submit: {
          target: 'submittingAgencyInfo',
          // condition: 'validate_agency_form_info',
        },
      },
    },
    submittingAgencyInfo: {
      entry: 'submit_agency_info_form',
      on: {
        submit_success: {
          actions: ['notify_agency_info_submitted_successfully', 'reset_agency_info_form'],
          target: 'agencyInfoForm',
        },
        submit_failed: {
          actions: ['notify_agency_info_submitting_failed'],
          target: 'agencyInfoForm',
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

  submit_agency_info_form: async (fsmInstance) => {
    const response = await submitAgencyInfoCommandTrigger.requestWithResponse(fsmInstance.getContext().agencyInfo);
    if (response == null) {
      fsmInstance.transition('submit_failed');
    }
    else {
      fsmInstance.transition('submit_success', {agencyInfo: response});
    }
  },

  notify_agency_info_submitted_successfully: () => {
    snackbarSignalTrigger.request({
      messageKey: 'page_agency_info_submitted_successfully',
    });
  },
  notify_agency_info_submitting_failed: () => {
    snackbarSignalTrigger.request({
      messageKey: 'page_agency_info_submitting_failed',
    });
  },
});

// condition
finiteStateMachineProvider.defineActions<AgencyInfoFsm>('agency_info_fsm', {});
