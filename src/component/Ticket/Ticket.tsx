import "./ticket.scss";
import { TicketType } from "../type/type";

import { addMinutes, getMinutes, getHours } from "date-fns";

const Ticket: React.FC<TicketType> = ({ price, segments, carrier }) => {
  const sitiThere = `${segments[0].origin}-${segments[0].destination}`;
  const sitiBack = `${segments[1].origin}-${segments[1].destination}`;
  const durationThere = segments[0].duration;
  const durationBack = segments[1].duration;
  const flightTimeThere = `${Math.floor(durationThere / 60)}ч ${
    durationThere - Math.floor(durationThere / 60) * 60
  }м`;
  const flightTimeBack = `${Math.floor(durationBack / 60)}ч ${
    durationBack - Math.floor(durationBack / 60) * 60
  }м`;
  const howManyTransfersThere = `${segments[0].stops.length} пересадки`;
  const howManyTransfersBack = `${segments[1].stops.length} пересадки`;
  const transferСitiesThereArr = segments[0].stops;

  let transferСitiesThere = "";
  if (transferСitiesThereArr.length) {
    transferСitiesThere = segments[0].stops[0];
    for (let i = 1; i < transferСitiesThereArr.length; i += 1) {
      transferСitiesThere += `, ${segments[0].stops[i]}`;
    }
  }
  const transferСitiesBackArr = segments[1].stops;

  let transferСitiesBack = "";
  if (transferСitiesBackArr.length) {
    transferСitiesBack = segments[1].stops[0];
    for (let i = 1; i < transferСitiesBackArr.length; i += 1) {
      transferСitiesBack += `, ${segments[1].stops[i]}`;
    }
  }
  const dateThere = new Date(segments[0].date);
  const dateBack = new Date(segments[1].date);
  const periodFlightTimeThere = `${getHours(dateThere)
    .toString()
    .padStart(2, "0")}:${getMinutes(dateThere)
    .toString()
    .padStart(2, "0")}-${getHours(addMinutes(dateThere, durationThere))
    .toString()
    .padStart(2, "0")}:${getMinutes(addMinutes(dateThere, durationThere))
    .toString()
    .padStart(2, "0")}`;

  const periodFlightTimeBack = `${getHours(dateBack)
    .toString()
    .padStart(2, "0")}:${getMinutes(dateBack)
    .toString()
    .padStart(2, "0")}-${getHours(addMinutes(dateBack, durationBack))
    .toString()
    .padStart(2, "0")}:${getMinutes(addMinutes(dateBack, durationBack))
    .toString()
    .padStart(2, "0")}`;

  return (
    <div className={"ticket"}>
      <div className={"ticket-header"}>
        <span>{price}</span>
        <img
          src={`http://pics.avs.io/99/36/${carrier}.png`}
          alt="logo compani"
        />
      </div>
      <div className={"return-flight"}>
        <div>
          <p className={"explanation"}>{sitiThere}</p>
          <p className={"description"}>{periodFlightTimeThere}</p>
        </div>
        <div>
          <p className={"explanation"}>в пути</p>
          <p className={"description"}>{flightTimeThere}</p>
        </div>
        <div>
          <p className={"explanation"}>{howManyTransfersThere}</p>
          <p className={"description"}>{transferСitiesThere}</p>
        </div>
      </div>
      <div className={"return-flight-information"}>
        <div>
          <p className={"explanation"}>{sitiBack}</p>
          <p className={"description"}>{periodFlightTimeBack}</p>
        </div>
        <div>
          <p className={"explanation"}>в пути</p>
          <p className={"description"}>{flightTimeBack}</p>
        </div>
        <div>
          <p className={"explanation"}>{howManyTransfersBack}</p>
          <p className={"description"}>{transferСitiesBack}</p>
        </div>
      </div>
    </div>
  );
};

export default Ticket;
