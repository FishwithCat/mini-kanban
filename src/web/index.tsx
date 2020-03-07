import React from 'react';
import ReactDOM from 'react-dom';
import { Layout } from '@/web/layout';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn' // load on demand
import relativeTime from 'dayjs/plugin/relativeTime'
import '@/web/style.css';

dayjs.locale('zh-cn') // use Spanish locale globally
dayjs.extend(relativeTime)



ReactDOM.render(<Layout />, document.getElementById('root'));