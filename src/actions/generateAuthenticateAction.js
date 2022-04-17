const ACCOUNT_POLICY = "policy.seeds";
const ACTION_CREATE = "create";

export const generateAuthenticateAction = ({
  id,
  signature,
  policy,
  actor = "............1",
  permission = "active",
}) => {
  return [
    {
      account: ACCOUNT_POLICY,
      name: ACTION_CREATE,
      authorization: [
        {
          actor,
          permission,
        },
      ],
      data: {
        account: actor,
        device_id: id,
        signature: signature,
        backend_user_id: id,
        policy: policy,
      },
    },
  ];
};
