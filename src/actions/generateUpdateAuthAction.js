const ACCOUNT_EOSIO = "eosio";
const ACTION_UPDATEAUTH = "updateauth";
const PERMISSION_SEEDS = "seeds";

const generateUpdateAuthAction = ({
  publicKey,
  actor = "............1",
  permission = "............2",
}) => {
  const authorization_object = {
    threshold: 1,
    accounts: [
      {
        permission: {
          actor,
          permission,
        },
        weight: 1,
      },
    ],
    keys: [
      {
        key: publicKey,
        weight: 1,
      },
    ],
    waits: [],
  };

  const updateauth_input = {
    account: actor,
    permission: PERMISSION_SEEDS,
    parent: permission,
    auth: authorization_object,
  };

  const actions = [
    {
      account: ACCOUNT_EOSIO,
      name: ACTION_UPDATEAUTH,
      authorization: [
        {
          actor,
          permission,
        },
      ],
      data: updateauth_input,
    },
  ];

  return actions;
};

module.exports = { generateUpdateAuthAction };
