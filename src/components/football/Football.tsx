import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../store/storeHooks";

import { predictData } from "../../store/footballPredictSlice";
import Message from "../../utilities/Message";
import Loader from "../../utilities/Loader";
import styles from "./Football.module.scss";

const Football: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [filterGame, setFilterGame] = useState("39");

  //get football data
  const { loading, error, data } = useAppSelector(
    (state) => state.footballPredict
  );
  //authenticate
  const { userInfo } = useAppSelector((state) => state.login);
  //effect
  useEffect(() => {
    if (!userInfo || !userInfo?.isAdmin) {
      return navigate("/admin");
    } else {
      dispatch(predictData(Number(filterGame)));
    }
  }, [dispatch, userInfo, filterGame, navigate]);
  return (
    <div>
      <h2>Football Predict List</h2>
      <div className={styles.searchBy}>
        <div>
          <label htmlFor="filer">Filter BY Game:</label>
          <select
            id="filter"
            required
            className="nav-dropdown"
            onChange={(e) => {
              setFilterGame(e.target.value);
            }}
          >
            <option value="39">EPL</option>
            <option value="140">La Liga</option>
            <option value="78">Bungesliga</option>
            <option value="61">Ligue 1</option>
          </select>
        </div>
      </div>
      <div>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <div className="table-responsive">
            <table className="table table-striped">
              <caption>List of Prediction</caption>
              <thead>
                <tr className="fs-4">
                  <th scope="col">Game</th>
                  <th scope="col">Goal Aggregate</th>
                  <th scope="col">Same Team Aggregate</th>
                  <th scope="col">Shots On Target Aggregate</th>
                </tr>
              </thead>
              <tbody>
                {data.map((d) => (
                  <tr key={d.game} className="fs-4">
                    <td>{d.game}</td>
                    <td>{d.goalAggregate}</td>
                    <td>{d.sameTeamAggregate}</td>
                    <td>{d.shotsOnTargetAggregate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Football;
