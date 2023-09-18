# 프로젝트 위치 설정
REPOSITORY=/home/ubuntu/delivery-boss

# 프로젝트 위치로 이동
cd #REPOSITORY

# 서버 PC 환경에서 package 설치
echo "> setup packages"
npm install

# 프로젝트를 다시 build
echo "> build application"
nest build

# pm2로 실행중이던 app 재실행
echo "> reload application"
pm2 reload delivery-boss