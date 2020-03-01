import React from 'react';
import Tooltip from '@material-ui/core/Tooltip';
import { Card, Image } from 'semantic-ui-react';
import { string, number, shape } from 'prop-types';

import './imageCard.scss';

const ImageCard = props => {
  const { imgName, fullName, sol, cameraShort, cameraFull, roverName, roverStatus } = props.photoData;

  return (
    <Card className="photo-card" key={imgName}>
      <Image src={fullName} wrapped ui={false} />
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
    </Card>
  );
};

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
};

export default ImageCard;
