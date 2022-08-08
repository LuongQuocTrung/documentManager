export class Category {
    constructor(name) {
        this.name = name;
    }
}
export class Post {
    constructor(title, text) {
        this.title = title;
        this.text = text;
        this.createdAt = new Date('6-5-2020');
        this.updatedAt = new Date('2-1-2021');
    }
}

export class User {
    constructor(name) {
        this.name = name;
        this.birthDate = new Date();
    }
}
/*   

import AppDataSource, { connection } from "./src/config/configConnection.js";
import { User, Post, Category } from "./src/model/Model.js";
import { request } from "http";
import { Between, ILike } from "typeorm";
const postRes = await AppDataSource.getRepository("Post");
    const userRes = await AppDataSource.getRepository("User");
    const cateRes = await AppDataSource.getRepository("Category");
    console.log(req.body);
    // let rs = await postRes
    //   .createQueryBuilder("Post")
    //   .innerJoinAndSelect("Post.author", "User")
    //   .innerJoinAndSelect("Post.categories", "Category");
    // if (req.body.categoryId) {
    //   await rs.where("Category.id = :id", { id: req.body.categoryId });
    // }
    // if (req.body.keyword) {
    //   await rs.where("Post.title LIKE :keyword", {
    //     keyword: "%" + req.body.keyword + "%",
    //   });
    // }
    // return res
    //   .status(200)
    //   .json(
    //     typeof (await rs
    //       .orderBy({ "Post.createdAt": "ASC" })
    //       .limit(2)
    //       .offset(2)
    //       .getMany())
    //   );
    const rs = await postRes.find({
      relations: {
        author: true,
        categories: true,
      },
      where: {
        title: ILike(`%${req.body.keyword}%`),
        createdAt: Between(new Date("4-1-2020"), new Date("12-12-2021")),
      },
    });