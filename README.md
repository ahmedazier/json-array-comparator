# 🚀 JSON Array Comparator

A powerful web application for comparing JSON arrays with advanced query filtering capabilities. Built with Next.js 15, TypeScript, and Tailwind CSS.

![Next.js](https://img.shields.io/badge/Next.js-15.4.2-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC?style=for-the-badge&logo=tailwind-css)
![React](https://img.shields.io/badge/React-19.1.0-61DAFB?style=for-the-badge&logo=react)

## ✨ Features

### 🔍 **Core Functionality**
- **JSON Array Comparison**: Compare two JSON arrays side-by-side with detailed analysis
- **Advanced Query Filtering**: Filter arrays using powerful query syntax before comparison
- **Real-time Analysis**: Instant comparison results with live updates
- **Visual Diff**: Color-coded indicators for additions, deletions, modifications, and identical items

### 🎨 **User Experience**
- **Dark/Light Mode**: Seamless theme switching with persistent preferences
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Modern UI**: Clean, intuitive interface built with Radix UI components
- **Interactive Query Builder**: Visual query construction with syntax help

### 🔧 **Advanced Features**
- **Flexible Sorting**: Sort by any nested property or disable sorting
- **Query Syntax**: Support for complex filtering with multiple operators
- **Detailed Reporting**: Multiple view modes (Summary, Detailed, Side-by-Side, Report)
- **Error Handling**: Graceful error handling with user-friendly messages

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/ahmedazier/json-array-comparator.git
   cd json-array-comparator
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📖 Usage Guide

### Basic Comparison

1. **Input JSON Arrays**: Paste your JSON arrays into the two text areas
2. **Configure Sorting**: Choose a property to sort by or disable sorting
3. **Apply Filters**: Use the query builder to filter arrays before comparison
4. **View Results**: Analyze differences in the comparison results section

### Query Filtering

The app supports powerful query filtering with the following operators:

#### **Comparison Operators**
```javascript
age = 25          // Exact match
age != 25         // Not equal
age > 25          // Greater than
age < 25          // Less than
age >= 25         // Greater than or equal
age <= 25         // Less than or equal
```

#### **String Operators**
```javascript
name contains 'John'      // Contains substring
name startswith 'Jo'      // Starts with
name endswith 'hn'        // Ends with
```

#### **Array Operators**
```javascript
skills includes 'React'    // Array contains value
status in ['active', 'pending']  // Value in array
status not in ['inactive']       // Value not in array
```

#### **Property Operators**
```javascript
email exists              // Property exists
email not exists          // Property doesn't exist
```

#### **Logical Operators**
```javascript
age > 25 AND status = 'active'           // AND condition
city = 'New York' OR city = 'Los Angeles' // OR condition
```

#### **Nested Properties**
```javascript
address.city = 'Seattle'          // Nested property access
profile.settings.theme = 'dark'   // Deep nesting
```

### Example Queries

```javascript
// Simple conditions
age > 25
name contains 'John'
status = 'active'

// Complex queries
age >= 30 AND city = 'New York'
skills includes 'React' OR skills includes 'Vue'
status in ['active', 'pending'] AND age > 25

// Nested properties
address.city = 'Seattle' AND age > 30
profile.settings.theme = 'dark' OR profile.settings.theme = 'light'
```

## 🛠️ Tech Stack

### Frontend
- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS 4** - Utility-first CSS framework
- **Radix UI** - Accessible component primitives
- **React Hook Form** - Form handling and validation
- **Zod** - Schema validation

### Development Tools
- **ESLint** - Code linting
- **Turbopack** - Fast bundler for development

## 📁 Project Structure

```
json-array-comparator/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── ui/               # Reusable UI components
│   ├── tools/            # Main application tools
│   │   ├── json-array.tsx    # Main comparator component
│   │   └── query-builder.tsx # Query builder component
│   ├── header.tsx        # Application header
│   ├── footer.tsx        # Application footer
│   └── toggle-mode.tsx   # Theme toggle
├── lib/                  # Utility functions
│   └── query-parser.ts   # Query parsing and execution
├── hooks/                # Custom React hooks
└── public/               # Static assets
```

## 🎯 Roadmap

### 🚧 Coming Soon
- [ ] **Export Options**: Export comparison results in multiple formats (JSON, CSV, PDF)
- [ ] **Advanced Analytics**: Statistical analysis of JSON differences
- [ ] **Custom Themes**: User-defined color schemes
- [ ] **Collaboration**: Real-time collaborative editing
- [ ] **API Integration**: Connect to external data sources
- [ ] **Plugin System**: Extensible architecture for custom features
- [ ] **Performance Monitoring**: Built-in performance analytics
- [ ] **Multi-language Support**: Internationalization (i18n)
- [ ] **Offline Mode**: PWA capabilities for offline usage

### 🔮 Future Features
- [ ] **AI-Powered Analysis**: Machine learning for pattern detection
- [ ] **Visualization**: Charts and graphs for data insights
- [ ] **Version Control**: Track changes over time
- [ ] **Cloud Sync**: Save comparisons to the cloud
- [ ] **Mobile App**: Native mobile applications

## 🤝 Contributing

We welcome contributions! Please read our contributing guidelines:

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/amazing-feature`)
3. **Commit your changes** (`git commit -m 'Add amazing feature'`)
4. **Push to the branch** (`git push origin feature/amazing-feature`)
5. **Open a Pull Request**

### Development Guidelines
- Follow TypeScript best practices
- Write comprehensive tests
- Update documentation for new features
- Ensure accessibility compliance
- Maintain responsive design

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Next.js Team** - For the amazing React framework
- **Vercel** - For hosting and deployment
- **Tailwind CSS** - For the utility-first CSS framework
- **Radix UI** - For accessible component primitives
- **Open Source Community** - For inspiration and support

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/ahmedazier/json-array-comparator/issues)
- **Discussions**: [GitHub Discussions](https://github.com/ahmedazier/json-array-comparator/discussions)
- **Email**: hello@ahmedazier.com

---

<div align="center">

**Built with ❤️ by [Ahmed Azier](https://github.com/ahmedazier)**

[![GitHub stars](https://img.shields.io/github/stars/ahmedazier/json-array-comparator?style=social)](https://github.com/ahmedazier/json-array-comparator)
[![GitHub forks](https://img.shields.io/github/forks/ahmedazier/json-array-comparator?style=social)](https://github.com/ahmedazier/json-array-comparator)
[![GitHub issues](https://img.shields.io/github/issues/ahmedazier/json-array-comparator)](https://github.com/ahmedazier/json-array-comparator/issues)

</div>
