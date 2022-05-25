import "./widgetLg.css";
import Piechart from "../pieChart/Piechart";
import React from "react";
import FiberManualRecordOutlinedIcon from "@mui/icons-material/FiberManualRecordOutlined";
import FillAreaChart from "../areaChart/AreaChart";
import { useEffect, useMemo, useState } from "react";
import { userRequest } from "../../requestMethods";

const WidgetLg = () => {
  const [taskStats, setTaskStats] = useState([]);

  const MONTHS = useMemo(
    () => [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Agu",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    []
  );

  useEffect(() => {
    const getTaskStats = async () => {
      try {
        const res = await userRequest.get("/tasks/stats");

        res.data.map((item) => {
          setTaskStats((prev) => [
            ...prev,
            { name: MONTHS[item._id], "Active Tasks": item.total },
          ]);
        });
      } catch {}
    };
    getTaskStats();
  }, [MONTHS]);

  return (
    <div className="widgetLg">
      <div className="widgetLgchart">
        <div className="widgetLgleft">
          <span className="widgetLgTitle">User Analytics</span>
          <Piechart className="widgetLgchart" />
          <div className="chartItems">
          <div className="chartItem">
              <FiberManualRecordOutlinedIcon className="dotIndicator manager" />
              <h3 className="chartItemText">Managers</h3>
            </div>
            <div className="chartItem">
              <FiberManualRecordOutlinedIcon className="dotIndicator developer" />
              <h3 className="chartItemText">Developers</h3>
            </div>
            <div className="chartItem">
              <FiberManualRecordOutlinedIcon className="dotIndicator admin" />
              <h3 className="chartItemText">Admins</h3>
            </div>
          </div>
        </div>
        <div className="widgetLgright">
          <span className="widgetLgTitle">Task Analytics</span>
          <FillAreaChart
            data={taskStats}
            title="Task Analytics"
            dataKey="Active Tasks"
          />
        </div>
      </div>
    </div>
  );
};

export default WidgetLg;
