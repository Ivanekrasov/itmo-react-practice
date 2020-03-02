import React, { useState, useEffect } from 'react';
import Tooltip from '@material-ui/core/Tooltip';
import { Card, Image, Dimmer, Loader, Segment } from 'semantic-ui-react';
import { string, number, shape, func } from 'prop-types';

import './imageCard.scss';

function ImageCard(props) {
  const [loaded, setLoadingStatus] = useState(false);
  const { setFirstLoad } = props;
  const { imgName, fullName, sol, cameraShort, cameraFull, roverName, roverStatus } = props.photoData;

  useEffect(() => setFirstLoad(false), []);

  return (
    <Card className="photo-card" key={imgName}>
      {!loaded && (
        <Segment className="photo-card__spinner">
          <Dimmer active>
            <Loader />
          </Dimmer>

          <Image src="https://react.semantic-ui.com/images/wireframe/short-paragraph.png" />
        </Segment>
      )}
      <Image
        className={!loaded && 'photo-card__hide'}
        src={fullName}
        wrapped
        ui={false}
        onLoad={() => {
          setLoadingStatus(true);
        }}
      />
      {loaded && (
        <Card.Content>
          <Card.Header>{`Image ${imgName}`}</Card.Header>
          <Card.Meta>{`Sol: ${sol}`}</Card.Meta>
          <Card.Description>
            <span>Camera: </span>
            <Tooltip title={<span className="photo-card__tooltip">{cameraFull}</span>} placement="right-start">
              <span className="photo-card__camera">{cameraShort}</span>
            </Tooltip>
          </Card.Description>
          <Card.Description>
            <span>Rover: </span>
            <Tooltip
              title={<span className="photo-card__tooltip">{`Status: ${roverStatus}`}</span>}
              placement="right-start"
            >
              <span className="photo-card__camera">{roverName}</span>
            </Tooltip>
          </Card.Description>
        </Card.Content>
      )}
    </Card>
  );
}

ImageCard.propTypes = {
  photoData: shape({
    imgName: string,
    fullName: string,
    sol: number,
    cameraShort: string,
    cameraFull: string,
    roverName: string,
    roverStatus: string,
  }),
  setFirstLoad: func,
};

export default ImageCard;
