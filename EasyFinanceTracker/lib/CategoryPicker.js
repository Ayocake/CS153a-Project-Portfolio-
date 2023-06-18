import React, { useState } from 'react';
import { Picker } from '@react-native-picker/picker';

const CategoryPicker = ({ onCategoryChange }) => {
  const [selectedCategory, setSelectedCategory] = useState('');

  const handleChange = (value) => {
    setSelectedCategory(value);
    onCategoryChange(value);
  };

  return (
    <Picker
      selectedValue={selectedCategory}
      onValueChange={handleChange}
    >
      <Picker.Item label="Select a category..." value="" />
      <Picker.Item label="Food & Dining" value="Food & Dining" />
      <Picker.Item label="Bills & Utilities" value="Bills & Utilities" />
      <Picker.Item label="Shopping" value="Shopping" />
      <Picker.Item label="Food & Dining" value="Travel" />
      <Picker.Item label="Food & Dining" value="Education" />
      <Picker.Item label="Transportation" value="Transportation" />
      <Picker.Item label="Entertainment" value="Entertainment" />
      <Picker.Item label="Income" value="Income" />
    </Picker>
  );
};

export default CategoryPicker;
