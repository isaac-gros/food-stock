import React from 'react';
import { View, Text, FlatList } from 'react-native';

class HomeScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [
        {
          id: 1,
          name: 'Banane',
          batchs: [
            {
              id: 1,
              quantity: 3,
              created_at: 1612976706,
              expired_at: 1613001906,
              category: {
                id: 1,
                name: 'Fruits',
                average_expiry: 604800,
              },
            },
          ],
        },
        {
          id: 2,
          name: 'Steak',
          batchs: [],
        },
        {
          id: 3,
          name: 'Truite',
          batchs: [
            {
              id: 2,
              quantity: 1,
              created_at: 1612976706,
              expired_at: 1613235906,
              category: {
                id: 1,
                name: 'Poisson',
                average_expiry: 604800,
              },
            },
          ],
        },
      ],
    };
  }

  componentDidMount() {
    // console.log(this.props.data);
  }

  render() {
    const { data } = this.state;

    return (
      <View>
        {data.map(d => (
          <View key={d.id}>
            <Text>{d.name}</Text>
          </View>
        ))}
      </View>
    );
  }
}

export default HomeScreen;
