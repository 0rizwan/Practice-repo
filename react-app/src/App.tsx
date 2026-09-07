import { useState } from 'react';

import Searchbar from './features/autocomplete-searchbar/Searchbar.js';
import ExpenseDashboard2 from './features/expense-dashboard/ExpenseDashboard2.js';
import Pagination from './features/pagination/Pagination.js';
import TabForm from './features/tab-form/TabForm.js';
import FileExplorer from './features/file-explorer/FileExplorer.js';
import ProgressBar from './features/progress-bar/ProgressBar.js';

const features = {
  search: {
    label: 'Searchbar',
    component: Searchbar
  },
  expense: {
    label: 'Expense Dashboard',
    component: ExpenseDashboard2
  },
  pagination: {
    label: 'Pagination',
    component: Pagination
  },
  tabs: {
    label: 'Tab Form',
    component: TabForm
  },
  files: {
    label: 'File Explorer',
    component: FileExplorer
  },
  progressBar: {
    label: 'Progress Bar',
    component: ProgressBar
  },
};

type FeatureName = keyof typeof features;

const App = () => {
  const [selectedFeature, setSelectedFeature] = useState<FeatureName>('progressBar');
  const Feature = features[selectedFeature].component;

  return (
    <>
      <select
        value={selectedFeature}
        onChange={(e) => setSelectedFeature(e.target.value as FeatureName)}
      >
        {Object.entries(features).map(([key, feature]) => (
          <option key={key} value={key}>
            {feature.label}
          </option>
        ))}
      </select>

      <Feature />
    </>
  );
};

export default App;
