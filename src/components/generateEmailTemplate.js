export const generateEmailTemplate = ({ companyName, text }) => `
<!DOCTYPE html>
<html>
<head>
  <style>
    body {
      font-family: Arial, sans-serif;
      margin: 0;
      padding: 0;
    }
    .container {
      border: 1px solid #ccc;
      padding: 20px;
      max-width: 600px;
      margin: auto;
      background-color: #f9f9f9;
    }
    .header {
      font-size: 24px;
      font-weight: bold;
      text-align: center;
      border-bottom: 2px solid #000;
      padding-bottom: 10px;
      margin-bottom: 20px;
    }
    .card {
      border: 1px solid #ccc;
      display: flex;
      margin-bottom: 20px;
      padding: 10px;
    }
    .card-icon {
      flex: 1;
      text-align: center;
      font-size: 24px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .card-content {
      flex: 3;
      padding: 5px 10px;
      font-size: 18px;
    }
    .text-content {
      text-align: justify;
      text-indent: 20px;
      margin-top: 10px;
      line-height: 1.6;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">JOB DEKLO</div>
    <div class="card">
      <div class="card-icon">🏢</div> <!-- Replace with the CorporateFareIcon -->
      <div class="card-content">${companyName}</div>
    </div>
    <div class="text-content">${text}</div>
  </div>
</body>
</html>
`;
