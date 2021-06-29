const rand = () => Math.random().toString(36).substr(2)
export const generateToken = () => rand() + rand()

export const canAddNewTeammate = (actualTeam, newTeammate) => {
    const maxAmountInEachTeam = 3;
    const {
      biography: { alignment: newTeammateAlignment },
    } = newTeammate || {};
    const amountOfHeroes = actualTeam?.filter(
      ({ biography: { alignment } }) => alignment !== "bad"
    )?.length;
    const amountOfVillains = actualTeam?.filter(
      ({ biography: { alignment } }) => alignment !== "good"
    ).length;

    if (newTeammateAlignment === "bad")
      return amountOfVillains < maxAmountInEachTeam;
    if (newTeammateAlignment === "good")
      return amountOfHeroes < maxAmountInEachTeam;
  };

  