import React from 'react';
import ToyCard from './ToyCard'

const ToyContainer = ({ toys, likeToy, donateToy }) => {
  return(
    <div id="toy-collection">
      {toys.map(toy => <ToyCard toy={toy} likeToy={likeToy} donateToy={donateToy} />)}   
    </div>
  );
}

export default ToyContainer;
