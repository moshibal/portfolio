import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/storeHooks";

import { useNavigate } from "react-router-dom";
import Loader from "../../../utilities/Loader";
import Message from "../../../utilities/Message";
import {
  fetchFootballData,
  updateFootballData,
  autoUpdateFootballData,
} from "../../../store/footballSlice";
import styles from "../Football.module.scss";

const League = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [filterGame, setFilterGame] = useState("39");
  const [modalVisible, setModalVisible] = useState(false);
  const [modalInputError, setModalInputError] = useState(false);
  const [awayName, setawayName] = useState("");
  const [goal, setGoal] = useState("");
  const [shotsOnTarget, setShotsOnTarget] = useState("");
  const [updatingTeam, setUpdatingTeam] = useState(0);
  const [updatingTeamName, setUpdatingTeamName] = useState("");

  const { data, error, loading } = useAppSelector((state) => state.football);

  //authenticate
  const { userInfo } = useAppSelector((state) => state.login);
  //effect
  useEffect(() => {
    if (!userInfo || !userInfo?.isAdmin) {
      return navigate("/admin");
    } else {
      dispatch(fetchFootballData(Number(filterGame)));
    }
  }, [dispatch, userInfo, filterGame, navigate]);

  const updateHandler = (teamID: number, TeamName: string) => {
    setModalVisible(true);
    setUpdatingTeam(teamID);
    setUpdatingTeamName(TeamName);
    setGoal("");
    setShotsOnTarget("");
    setawayName("");
  };
  const autoUpdateHandler = (teamID: number) => {
    // setUpdatingTeam(teamID);
    if (teamID) {
      dispatch(autoUpdateFootballData(teamID, Number(filterGame)));
    }
  };

  const closeModal = () => {
    setModalVisible(false);
    setUpdatingTeam(0);
  };

  const handleUpdateButtonClick = () => {
    const updatingMatch = {
      awayName: awayName,
      goalHome: Number(goal),
      shotsOnTargetHome: Number(shotsOnTarget),
    };

    if (
      awayName.length === 0 ||
      goal.length === 0 ||
      shotsOnTarget.length === 0
    ) {
      setModalInputError(true);
    } else {
      dispatch(
        updateFootballData(updatingTeam, Number(filterGame), updatingMatch)
      );
      // Close the modal
      closeModal();
    }
  };

  return (
    <>
      <div className={styles.searchBy}>
        <div>
          <label htmlFor="filer">Filter BY Game:</label>
          <select
            id="filter"
            required
            className="nav-dropdown "
            onChange={(e) => {
              setFilterGame(e.target.value);
            }}
          >
            <option value="39">EPL</option>
            <option value="140">La Liga</option>
            <option value="78">Bungesliga</option>
            <option value="61">Ligue 1</option>
            <option value="135">Series A</option>
          </select>
        </div>
      </div>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <div className="container mt-5">
          <h1>Football Teams</h1>
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th>League</th>
                  <th>Team Name</th>
                  <th>Team ID</th>
                  <th>Matches</th>
                </tr>
              </thead>
              <tbody>
                {data.map((team) => (
                  <tr key={team.name}>
                    <td>{team.league}</td>
                    <td>{team.name}</td>
                    <td>{team.teamID}</td>
                    <td>
                      <ul>
                        <li>{`Away: ${team.matches[0]?.awayName} - Shots: ${team.matches[0]?.shotsOnTargetHome}, Goals: ${team.matches[0]?.goalHome}`}</li>
                        <li>{`Away: ${team.matches[1]?.awayName} - Shots: ${team.matches[1]?.shotsOnTargetHome}, Goals: ${team.matches[1]?.goalHome}`}</li>
                        <li>{`Away: ${team.matches[2]?.awayName} - Shots: ${team.matches[2]?.shotsOnTargetHome}, Goals: ${team.matches[2]?.goalHome}`}</li>
                      </ul>
                    </td>
                    <td>
                      <button
                        className="btn btn-primary"
                        onClick={() => {
                          updateHandler(team.teamID, team.name);
                        }}
                      >
                        Manual Update
                      </button>
                    </td>
                    <td>
                      <button
                        className="btn btn-primary"
                        onClick={() => {
                          autoUpdateHandler(team.teamID);
                        }}
                      >
                        Auto Update
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Modal */}
      {modalVisible && (
        <div className="modal" style={{ display: "block" }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  Update Team Information for {updatingTeamName}
                </h5>
                <button type="button" className="close" onClick={closeModal}>
                  &times;
                </button>
              </div>
              <div className="modal-body">
                {modalInputError && (
                  <Message variant="danger">
                    "PLease Check All Inputs Fields
                  </Message>
                )}
                <input
                  type="text"
                  value={awayName}
                  onChange={(e) => setawayName(e.target.value)}
                  placeholder="Away team name"
                />
                <input
                  type="text"
                  value={goal}
                  onChange={(e) => setGoal(e.target.value)}
                  placeholder="number of goals"
                />
                <input
                  type="text"
                  value={shotsOnTarget}
                  onChange={(e) => setShotsOnTarget(e.target.value)}
                  placeholder="number of shots on target"
                />
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={closeModal}
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleUpdateButtonClick}
                >
                  Update
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default League;
