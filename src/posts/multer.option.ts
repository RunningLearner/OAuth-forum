import { HttpException, HttpStatus } from '@nestjs/common';
import { existsSync, mkdirSync } from 'fs';
import { diskStorage } from 'multer';
import { extname } from 'path';

export const multerDiskOptions = {
  /**
   * @author Ryan
   * @description 클라이언트로 부터 전송 받은 파일 정보를 필터링 한다
   *
   * @param request Request 객체
   * @param file 파일 정보
   * @param callback 성공 및 실패 콜백함수
   */
  fileFilter: (request, file, callback) => {
    if (file.mimetype.match(/\/(jpg|jpeg|png)$/)) {
      // 이미지 형식은 jpg, jpeg, png만 허용합니다.
      callback(null, true);
    } else {
      callback(
        new HttpException(
          {
            message: 1,
            error: '지원하지 않는 이미지 형식입니다.',
          },
          HttpStatus.BAD_REQUEST,
        ),
        false,
      );
    }
  },
  /**
   * @description Disk 저장 방식 사용
   *
   * destination 옵션을 설정 하지 않으면 운영체제 시스템 임시 파일을 저정하는 기본 디렉토리를 사용합니다.
   * filename 옵션은 폴더안에 저장되는 파일 이름을 결정합니다. (디렉토리를 생성하지 않으면 에러가 발생!! )
   */
  storage: diskStorage({
    destination: (request, file, callback) => {
      const uploadPath = 'uploads';
      if (!existsSync(uploadPath)) {
        // uploads 폴더가 존재하지 않을시, 생성합니다.
        mkdirSync(uploadPath);
      }
      callback(null, uploadPath);
    },
    filename: (request, file, callback) => {
      //파일 이름 설정
      callback(null, `${Date.now()}${extname(file.originalname)}`);
    },
  }),
};
