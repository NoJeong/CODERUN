import React, { useState, useEffect } from 'react';
import VideoImageUpload from './Sections/VideoImgUpoload';
import VideoContent from './Sections/VideoContent';
import VideoTag from './Sections/VideoTag';
import Dropzone from 'react-dropzone';
import { PlusOutlined } from '@ant-design/icons';

// api
import { fetchLanguageTag, fetchAlgorithmTag, fetchCSTag } from '_api/Tag';
import { postVideoContentUpload, postVideoUpload } from '_api/Video';
import { postThumbnail } from '_api/Thumbnail';

import { Button, Row, Col } from 'antd';
import './VideoUpload.css';

function VideoUpload() {
    const [Languages, setLanguages] = useState([]);
    const [Algorithms, setAlgorithms] = useState([]);
    const [CSes, setCSes] = useState([]);
    const [Courses, setCourses] = useState(['알고리즘', 'CS']);
    const [Title, setTitle] = useState('');
    const [Content, setContent] = useState('');
    const [Lanid, setLanid] = useState(null);
    const [AlgoList, setAlgoList] = useState([]);
    const [CSList, setCSList] = useState([]);
    const [FileArray, setFileArray] = useState([]);
    const [VideoArray, setVideoArray] = useState([]);

    useEffect(() => {
        const TagData = async () => {
            try {
                const res1 = await fetchLanguageTag();
                setLanguages(res1.data.data);
                const res2 = await fetchAlgorithmTag();
                setAlgorithms(res2.data.data);
                const res3 = await fetchCSTag();
                setCSes(res3.data.data);
            } catch (err) {
                console.log(err);
            }
        };
        TagData();
    }, []);

    const renderCourseTag = Courses.map((course, index) => {
        return (
            <div>
                <Col lg={4} md={8} xs={24} key={index}>
                    <VideoTag
                        tag={course}
                        tag_id={index}
                        handlerTag={tag => handlerCourseTag(tag)}
                    />
                </Col>
            </div>
        );
    });
    const handlerCourseTag = tag => {
        console.log(tag);
    };

    const clickCourse = event => {
        const lan = document.getElementsByClassName('lan-container');
        const algo = document.getElementsByClassName('algo-container');
        const cs = document.getElementsByClassName('cs-container');

        if (event.target.innerHTML === '알고리즘') {
            if (event.target.style.backgroundColor !== 'grey') {
                event.target.style.backgroundColor = 'grey';
                lan[0].classList.remove('hidden');
                algo[0].classList.remove('hidden');
                cs[0].classList.add('hidden');
            } else {
                event.target.style.backgroundColor = '#01bf71';
                lan[0].classList.add('hidden');
                algo[0].classList.add('hidden');
                cs[0].classList.add('hidden');
            }
        } else if (event.target.innerHTML === 'CS') {
            if (event.target.style.backgroundColor !== 'grey') {
                event.target.style.backgroundColor = 'grey';
                cs[0].classList.remove('hidden');
                lan[0].classList.add('hidden');
                algo[0].classList.add('hidden');
            } else {
                event.target.style.backgroundColor = '#01bf71';
                lan[0].classList.add('hidden');
                algo[0].classList.add('hidden');
                cs[0].classList.add('hidden');
            }
        }
    };
    const handlerLanTag = (e, tag) => {
        setLanid(parseInt(tag));
        if (e.target.style.backgroundColor === 'grey') {
            e.target.style.backgroundColor = '#01bf71';
        } else {
            e.target.style.backgroundColor = 'grey';
        }

        // console.log(tag);
    };
    const handlerAlgoTag = (e, tag) => {
        if (e.target.style.backgroundColor === 'grey') {
            e.target.style.backgroundColor = '#01bf71';
            const idx = AlgoList.indexOf(tag);
            AlgoList.splice(idx, 1);
        } else {
            e.target.style.backgroundColor = 'grey';
            AlgoList.push(tag);
        }
    };
    const handlerCSTag = (e, tag) => {
        if (e.target.style.backgroundColor === 'grey') {
            e.target.style.backgroundColor = '#01bf71';
            const idx = CSList.indexOf(tag);
            CSList.splice(idx, 1);
        } else {
            e.target.style.backgroundColor = 'grey';
            CSList.push(tag);
        }
    };

    const renderLanguageTag = Languages.map((language, index) => {
        return (
            <div>
                <Col lg={4} md={8} xs={24} key={index}>
                    <VideoTag
                        tag={language.language_name}
                        tag_id={language.id}
                        handlerTag={(event, tag) => handlerLanTag(event, tag)}
                    />
                </Col>
            </div>
        );
    });
    const renderAlgorithmTag = Algorithms.map((algorithm, index) => {
        return (
            <div>
                <Col lg={4} md={8} xs={24} key={index}>
                    <VideoTag
                        tag={algorithm.algorithm_name}
                        tag_id={algorithm.id}
                        handlerTag={(event, tag) => handlerAlgoTag(event, tag)}
                    />
                </Col>
            </div>
        );
    });
    const renderCSTag = CSes.map((cs, index) => {
        return (
            <div>
                <Col lg={4} md={8} xs={24} key={index}>
                    <VideoTag
                        tag={cs.subject_name}
                        tag_id={cs.id}
                        handlerTag={(event, tag) => handlerCSTag(event, tag)}
                    />
                </Col>
            </div>
        );
    });

    const handlerTitle = title => {
        setTitle(title);
    };
    const handlerInfo = info => {
        setContent(info);
    };

    const postVideo = e => {
        const body = {
            title: Title,
            content: Content,
            language_tag_id: Lanid,
            algorithm_tag_ids: AlgoList,
            subject_tag_ids: CSList,
        };

        postVideoContentUpload(body)
            .then(res => {
                console.log(res.data.data.id);
                const video_id = res.data.data.id;
                let formData = new FormData();
                // console.log(FileArray);
                formData.append('file', FileArray);
                postThumbnail(video_id, formData)
                    .then(res => console.log(res))
                    .catch(err => console.log(err));
                let formData2 = new FormData();
                console.log(VideoArray);
                formData2.append('file', VideoArray);
                const file_extension = VideoArray.type.split('/')[1];
                postVideoUpload(video_id, file_extension, formData2)
                    .then(res => console.log(res))
                    .catch(err => console.log(err));
            })
            .catch(err => console.log(err));
    };

    const dropHandler = file => {
        // console.log(file[0]);
        setFileArray(file[0]);
        // setFileArray(file.target.files);
    };

    const dropVideoHandler = video => {
        // console.log(video[0].type.split('/')[1]);
        setVideoArray(video[0]);
    };

    return (
        <div class="page">
            <div class="video-preview">
                <h1>비디오</h1>
                <Dropzone onDrop={dropVideoHandler}>
                    {({ getRootProps, getInputProps }) => (
                        <section>
                            <div
                                style={{
                                    width: 300,
                                    height: 200,
                                    border: '1px solid lightgray',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    marginBottom: '1rem',
                                }}
                                {...getRootProps()}
                            >
                                <input {...getInputProps()} />
                                <PlusOutlined type="plus" style={{ fontSize: '3rem' }} />
                            </div>
                        </section>
                    )}
                </Dropzone>
                <h1>썸네일</h1>
                <Dropzone onDrop={dropHandler}>
                    {({ getRootProps, getInputProps }) => (
                        <section>
                            <div
                                style={{
                                    width: 300,
                                    height: 200,
                                    border: '1px solid lightgray',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                                {...getRootProps()}
                            >
                                <input {...getInputProps()} />
                                <PlusOutlined type="plus" style={{ fontSize: '3rem' }} />
                            </div>
                        </section>
                    )}
                </Dropzone>
            </div>

            <div class="video-content">
                <h3>제목</h3>
                <VideoContent
                    row={1}
                    maxlength={50}
                    handlerContent={title => handlerTitle(title)}
                />
                <h3>내용</h3>
                <VideoContent
                    row={10}
                    maxlength={1000}
                    handlerContent={info => handlerInfo(info)}
                />
                <Button onClick={postVideo}>제출</Button>
            </div>
            <div class="video-tag" onClick={clickCourse}>
                <div>
                    <h3>코스 선택</h3>
                    <Row gutter={[8, 16]}>{renderCourseTag}</Row>
                </div>
                <div class="lan-container hidden">
                    <h3>언어(1개)</h3>
                    <Row gutter={[8, 16]}>{renderLanguageTag}</Row>
                </div>
                <div class="algo-container hidden">
                    <h3>알고리즘(복수가능)</h3>
                    <Row gutter={[8, 16]}>{renderAlgorithmTag}</Row>
                </div>
                <div class="cs-container hidden">
                    <h3>CS(복수가능)</h3>
                    <Row gutter={[8, 16]}>{renderCSTag}</Row>
                </div>
            </div>
        </div>
    );
}

export default VideoUpload;
