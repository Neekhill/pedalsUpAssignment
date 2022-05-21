import "./table.css";
import { FaExclamationCircle } from "react-icons/fa";
import { FaSpinner } from "react-icons/fa";
import { BiSortAlt2 } from "react-icons/bi";

const Table = ({ currentState, apiData, AvailableStates, handleSort }) => {
  return (
    <div>
      <table className="api-data-table">
        <thead>
          <tr>
            <th>
              Name<br></br>
              <BiSortAlt2
                size={22}
                style={{
                  padding: " 5px",
                }}
                onClick={() => {
                  handleSort("asc");
                }}
                onDoubleClick={() => {
                  handleSort("dsc");
                }}
              />
            </th>
            <th>Height</th>
            <th>Mass</th>
            <th>Hair color</th>
            <th>Skin color</th>
            <th>Eye color</th>
            <th>Birth year</th>
            <th>gender</th>
            <th>Homeworld</th>
            <th>Films</th>
            <th>Species</th>
            <th>Vehicles</th>
            <th>Starships</th>
            <th>Created</th>
            <th>Edited</th>
            <th>Url</th>
          </tr>
        </thead>
        <tbody>
          {currentState === AvailableStates.SUCCESS &&
            apiData.map((obj) => {
              return (
                <tr key={obj.name}>
                  <td>{obj.name}</td>
                  <td>{obj.height}</td>
                  <td>{obj.mass}</td>
                  <td>{obj.hair_color}</td>
                  <td>{obj.skin_color}</td>
                  <td>{obj.eye_color}</td>
                  <td>{obj.birth_year}</td>
                  <td>{obj.gender}</td>
                  <td>{obj.homeworld}</td>
                  <td>
                    {obj.films.map((film) => {
                      return `${film}
                                    `;
                    })}
                  </td>
                  <td>
                    {obj.species.map((sp) => {
                      return `${sp}
                                    `;
                    })}
                  </td>
                  <td>
                    {obj.vehicles.map((vehicle) => {
                      return `${vehicle}
                                    `;
                    })}
                  </td>
                  <td>
                    {obj.starships.map((starship) => {
                      return `${starship}
                                    `;
                    })}
                  </td>
                  <td>{obj.created}</td>
                  <td>{obj.edited}</td>
                  <td>{obj.url}</td>
                </tr>
              );
            })}
          {currentState === AvailableStates.LOADING && (
            <tr
              style={{
                width: "95vw",
                height: "75vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontSize: "16px",
                fontWeight: "bold",
              }}
            >
              <td
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <FaSpinner style={{ marginRight: "5px" }} /> Loading...
              </td>
            </tr>
          )}
          {currentState === AvailableStates.ERROR && (
            <tr
              style={{
                width: "95vw",
                height: "75vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontSize: "16px",
                fontWeight: "bold",
              }}
            >
              <td
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <FaExclamationCircle style={{ marginRight: "5px" }} /> Error
                connecting
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
