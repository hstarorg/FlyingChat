import * as React from 'react';
import { StyleSheet, Text, TouchableHighlight, TouchableOpacity, View } from 'react-native';
import { SwipeListView } from 'react-native-swipe-list-view';

export class HomeScreen extends React.Component<{}> {
  state = {
    listViewData: Array(20)
      .fill('')
      .map((_, i) => ({ key: `${i}`, text: `item #${i}` }))
  };

  onRowDidOpen() {}
  closeRow(rowMap, rowKey) {
    if (rowMap[rowKey]) {
      rowMap[rowKey].closeRow();
    }
  }

  deleteRow(rowMap, rowKey) {
    this.closeRow(rowMap, rowKey);
    const newData = [...this.state.listViewData];
    const prevIndex = this.state.listViewData.findIndex(item => item.key === rowKey);
    newData.splice(prevIndex, 1);
    this.setState({ listViewData: newData });
  }

  render() {
    return (
      <SwipeListView
        useFlatList
        data={this.state.listViewData}
        disableRightSwipe={true}
        leftOpenValue={0}
        rightOpenValue={-150}
        onRowDidOpen={this.onRowDidOpen}
        renderItem={(data, rowMap) => (
          <TouchableHighlight
            onPress={_ => console.log('You touched me')}
            style={styles.rowFront}
            underlayColor={'#AAA'}
          >
            <View>
              <Text>I am {data.item.text} in a SwipeListView</Text>
            </View>
          </TouchableHighlight>
        )}
        renderHiddenItem={(data, rowMap) => (
          <View style={styles.rowBack}>
            <TouchableOpacity
              style={[styles.backRightBtn, styles.backRightBtnLeft]}
              onPress={_ => this.closeRow(rowMap, data.item.key)}
            >
              <Text style={styles.backTextWhite}>标记未读</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.backRightBtn, styles.backRightBtnRight]}
              onPress={_ => this.deleteRow(rowMap, data.item.key)}
            >
              <Text style={styles.backTextWhite}>删除</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    );
  }
}

const styles = StyleSheet.create({
  backTextWhite: {
    color: '#FFF'
  },
  rowFront: {
    alignItems: 'center',
    backgroundColor: '#CCC',
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    justifyContent: 'center',
    height: 50
  },
  rowBack: {
    alignItems: 'center',
    backgroundColor: '#DDD',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 15
  },
  backRightBtn: {
    alignItems: 'center',
    bottom: 0,
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    width: 75
  },
  backRightBtnLeft: {
    backgroundColor: 'blue',
    right: 75
  },
  backRightBtnRight: {
    backgroundColor: 'red',
    right: 0
  }
});
