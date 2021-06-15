package com.app.pixett.service.impl;

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;

import com.app.pixett.service.PicService;

import Luxand.FSDK;
import Luxand.FSDK.HImage;

public class PicServiceImpl implements PicService{
	public void checkPic() throws IOException {
		FSDK.Initialize();
		Luxand.FSDK.HImage himage = new HImage();
		File f = new File("");
		FileInputStream fis = new FileInputStream(f);
		FileOutputStream fos = new FileOutputStream(f);
		ByteArrayOutputStream baos = new ByteArrayOutputStream();
		byte[] buffer = new byte[1024];
		int length;
		while ((length = fis.read(buffer)) != -1) {
			baos.write(buffer, 0, length);
			}
		 FSDK.LoadImageFromJpegBuffer(himage, baos.toByteArray(),
				 baos.size());

		FSDK.Finalize();
	}

	
}
