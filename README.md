## Project Summary

Web page is a part of the project called Gastro-App. The solution we suggest is pointed towards doctors and patients who struggle with gastrological diseases. The mobile application is for patients and will not be discussed here. Web page is for doctors so that they can manage various resources regarding patient's healing process.

## Technologies Used

- **Frontend:**

  - React + Vite
  - TypeScript
  - Tailwind CSS

- **Backend:**

  - python
  - fastApi
  - SQLAlchemy
  - redis
  - sqlite3
  - docker

## Deply new version to production server note:
  - npm run build
  - scp -r dist/* root@172.104.143.209:/var/www/html/
  - provide a passowrd