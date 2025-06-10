import { Button, Statistic, Empty, Typography, Progress, Row, Col } from "antd";
import { usePrinterStore } from "../App";
import { useEffect, useState } from "react";

const NotUseView = ({name, link}) => {
  return(
    <Col align="middle">
    <Typography.Title>{name}</Typography.Title>
      <Empty 
            image="https://www.svgrepo.com/download/75882/3d-printer.svg"
            styles={{ image: { height: 60 } }}
            description={
            <Typography.Text>
              {name} not in use.
            </Typography.Text>
        }>
      <Button type="primary" href={link} target="_blank">Print Now!</Button>
      </Empty>
    </Col>
      )
}

const UseView = ({name, timeLeft, left, link}) => {
  const {Timer} = Statistic;
  const deadline = Date.now() + timeLeft * 1000;

  return <Col align="middle">
    <Typography.Title>{name}</Typography.Title>
    <Row align="middle">
      <Typography.Text style={{paddingRight: "12px"}}>Print Time Left:</Typography.Text>
      <Timer type="countdown" value={deadline} />
    </Row>
    <Progress percent={Math.floor(left)} status="active"/>
    <Button style={{marginTop: "12px"}} type="primary" href={link} target="_blank">View Printer</Button>
  </Col>
}

const Info = () => {
  const {name, link, key} = usePrinterStore((state) => state.printer)
  const [info, setInfo] = useState(null);

  useEffect(() => {
    if (name != ""){
      const getData = async () => {
        try {
          const response = await fetch(`${link}/api/job`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "X-Api-key": key,
            },
          }).then((res) => res.json());

          setInfo(response);
        } catch (error) {
          setInfo(null);
        }
      };

      getData();
    }
  }, [name])

  if(info) {
    if(info["state"] === "Operational") {
      return <NotUseView name={name} link={link}/>
    } else {
      return <UseView name={name} estimatedPrintTime={info['progress']['printTimeLeft']} left={info['progress']['completion']*100} link={link}/>
    }
  } 

  return <></>
};

export default Info;
