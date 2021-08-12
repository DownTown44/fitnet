import Layout from './hoc/Layout';
import Feed from './containers/Feed';

import './css/style.css';

function App() {
  return (
    <div className="App">
      <Layout>
        {/* TODO: The children will be dynamic, and will be changed with routing */}
        <div className="content">
          <Feed/>
        </div>
      </Layout>
    </div>
  );
}

export default App;
