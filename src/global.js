import Vue from "vue";

export const laudoKey = "laudo_token";

export const flexFlowKey = "flexFlow_token";

export const smartApprovalKey = "smartApproval_token";

export function showError(e) {
  const obj = e.response.data.errors;
  let msg = "";
  for (const prop in obj) {
    msg += `${obj[prop]}; `;
  }

  if (e.response.data) {
    Vue.toasted.global.defaultError({ msg: msg });
  } else if (typeof e === "string") {
    Vue.toasted.global.defaultError({ msg: e });
  } else {
    Vue.toasted.global.defaultError();
  }
}

export default { laudoKey, flexFlowKey, smartApprovalKey, showError };
